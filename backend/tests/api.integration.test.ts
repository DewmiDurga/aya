import request from "supertest";
import { app } from "../src/app";

describe("Backend REST API & AI Chatbot End-to-End Suite", () => {
  const regularUserToken = "Bearer test-token-user-regular";
  const irregularUserToken = "Bearer test-token-user-irregular";

  describe("1. Profile Retrieval & Updates", () => {
    it("retrieves user profile and updates it via PUT/PATCH", async () => {
      // 1. Initial retrieval
      const getRes1 = await request(app)
        .get("/api/profile")
        .set("Authorization", regularUserToken);

      expect(getRes1.status).toBe(200);
      expect(getRes1.body).toHaveProperty("user_id");

      // 2. Update profile
      const updatePayload = {
        display_name: "Ayomi Perera",
        average_cycle_length: 29,
        average_period_duration: 5,
        is_cycle_regular: true
      };

      const putRes = await request(app)
        .put("/api/profile")
        .set("Authorization", regularUserToken)
        .send(updatePayload);

      expect(putRes.status).toBe(200);
      expect(putRes.body.display_name).toBe("Ayomi Perera");
      expect(putRes.body.average_cycle_length).toBe(29);

      // 3. Confirm retrieval returns updated fields
      const getRes2 = await request(app)
        .get("/api/profile")
        .set("Authorization", regularUserToken);

      expect(getRes2.status).toBe(200);
      expect(getRes2.body.display_name).toBe("Ayomi Perera");
      expect(getRes2.body.average_cycle_length).toBe(29);
    });
  });

  describe("2. Period Log Creation & Retrieval", () => {
    it("creates new period entries and retrieves the ordered list", async () => {
      const newPeriod = {
        start_date: "2026-09-01",
        end_date: "2026-09-06",
        flow_intensity: "medium"
      };

      const createRes = await request(app)
        .post("/api/periods")
        .set("Authorization", regularUserToken)
        .send(newPeriod);

      expect(createRes.status).toBe(201);
      expect(createRes.body.start_date).toBe("2026-09-01");

      const listRes = await request(app)
        .get("/api/periods")
        .set("Authorization", regularUserToken);

      expect(listRes.status).toBe(200);
      expect(Array.isArray(listRes.body)).toBe(true);
      const found = listRes.body.find((p: any) => p.start_date === "2026-09-01");
      expect(found).toBeDefined();
    });
  });

  describe("3. Daily Mood/Symptom Upserts & Idempotency", () => {
    it("confirms logging the same day twice updates the existing entry rather than duplicating", async () => {
      const testDate = "2026-10-06";

      // First log for this day
      const firstLog = {
        log_date: testDate,
        mood: "Calm",
        symptoms: ["Cramps"],
        notes: "Mild cramping in morning"
      };

      const res1 = await request(app)
        .post("/api/logs")
        .set("Authorization", regularUserToken)
        .send(firstLog);

      expect(res1.status).toBe(200);
      expect(res1.body.mood).toBe("Calm");
      expect(res1.body.symptoms).toEqual(["Cramps"]);

      // Second log on the EXACT SAME date (updating state)
      const secondLog = {
        log_date: testDate,
        mood: "Energized",
        symptoms: ["Cramps", "Headache"],
        notes: "Energy picked up after hydration"
      };

      const res2 = await request(app)
        .post("/api/logs")
        .set("Authorization", regularUserToken)
        .send(secondLog);

      expect(res2.status).toBe(200);
      expect(res2.body.mood).toBe("Energized");
      expect(res2.body.symptoms).toEqual(["Cramps", "Headache"]);

      // Query logs for this specific date
      const listRes = await request(app)
        .get(`/api/logs?from=${testDate}&to=${testDate}`)
        .set("Authorization", regularUserToken);

      expect(listRes.status).toBe(200);
      const matches = listRes.body.filter((l: any) => l.log_date === testDate);

      // CRITICAL ASSERTION: Exactly ONE record exists for the date, containing updated content
      expect(matches.length).toBe(1);
      expect(matches[0].mood).toBe("Energized");
      expect(matches[0].symptoms).toEqual(["Cramps", "Headache"]);
      expect(matches[0].notes).toBe("Energy picked up after hydration");
    });
  });

  describe("4. Cycle Prediction Validation (Regular vs. Irregular Users)", () => {
    it("scenario A: returns high confidence and narrow range for regular cycle intervals (~28 days)", async () => {
      // Seed regular periods (28-day intervals)
      const regularDates = ["2026-06-01", "2026-06-29", "2026-07-27", "2026-08-24"];
      for (const d of regularDates) {
        await request(app)
          .post("/api/periods")
          .set("Authorization", regularUserToken)
          .send({ start_date: d, flow_intensity: "medium" });
      }

      const predRes = await request(app)
        .get("/api/predictions")
        .set("Authorization", regularUserToken);

      expect(predRes.status).toBe(200);
      expect(predRes.body.available).toBe(true);
      expect(predRes.body.confidence).toBe("high");
      expect(predRes.body.cycleType).toBe("regular");
      expect(predRes.body.stdDevDays).toBeLessThanOrEqual(3.0);
      expect(predRes.body.predictedStart).toBeDefined();

      // Verify narrow range window
      const lowDate = new Date(predRes.body.rangeLow).getTime();
      const highDate = new Date(predRes.body.rangeHigh).getTime();
      const windowDays = Math.round((highDate - lowDate) / (1000 * 60 * 60 * 24));
      expect(windowDays).toBeLessThanOrEqual(6);
    });

    it("scenario B: returns low confidence and wider range for irregular cycle intervals", async () => {
      // Seed irregular periods (highly variable intervals: 20, 36, 45, 23 days)
      const irregularDates = ["2026-04-01", "2026-04-21", "2026-05-27", "2026-07-11", "2026-08-03"];
      for (const d of irregularDates) {
        await request(app)
          .post("/api/periods")
          .set("Authorization", irregularUserToken)
          .send({ start_date: d, flow_intensity: "medium" });
      }

      const predRes = await request(app)
        .get("/api/predictions")
        .set("Authorization", irregularUserToken);

      expect(predRes.status).toBe(200);
      expect(predRes.body.available).toBe(true);
      expect(predRes.body.confidence).toBe("low");
      expect(predRes.body.cycleType).toBe("irregular");
      expect(predRes.body.stdDevDays).toBeGreaterThan(6.0);

      // Verify wider margin window for irregular fluctuations
      const lowDate = new Date(predRes.body.rangeLow).getTime();
      const highDate = new Date(predRes.body.rangeHigh).getTime();
      const windowDays = Math.round((highDate - lowDate) / (1000 * 60 * 60 * 24));
      expect(windowDays).toBeGreaterThanOrEqual(14);
    });
  });

  describe("5. AI Chatbot Endpoint & Red-Flag Safety Validation", () => {
    it("returns clear, non-diagnostic response for standard health queries", async () => {
      const res = await request(app)
        .post("/api/chat")
        .set("Authorization", regularUserToken)
        .send({ message: "What nutritious foods are recommended during my luteal phase?" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("reply");
      expect(res.body.reply.length).toBeGreaterThan(15);
      expect(res.body.wasRedFlagged).toBe(false);
      expect(res.body.disclaimer).toBeNull();
    });

    it("triggers red-flag safety layer for concerning prolonged absence of periods", async () => {
      const res = await request(app)
        .post("/api/chat")
        .set("Authorization", regularUserToken)
        .send({ message: "I have had no period for 3 months, should I be worried?" });

      expect(res.status).toBe(200);
      expect(res.body.wasRedFlagged).toBe(true);
      expect(res.body.disclaimer).not.toBeNull();
      expect(res.body.disclaimer).toContain("medical evaluation");
      // Appends/includes doctor recommendation
      expect(res.body.reply.toLowerCase()).toMatch(/doctor|gynecologist|healthcare provider|physician/);
    });

    it("triggers red-flag safety layer for severe pain and fainting", async () => {
      const res = await request(app)
        .post("/api/chat")
        .set("Authorization", regularUserToken)
        .send({ message: "I have severe pain in my pelvis and passed out this morning" });

      expect(res.status).toBe(200);
      expect(res.body.wasRedFlagged).toBe(true);
      expect(res.body.disclaimer).not.toBeNull();
    });
  });
});
