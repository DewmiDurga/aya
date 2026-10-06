import { checkRedFlags } from "../src/services/redFlag.service";

describe("Red-Flag Safety Layer", () => {
  describe("Normal health queries", () => {
    it("returns false for standard non-emergency symptoms and queries", () => {
      const normalQueries = [
        "What should I eat during my luteal phase?",
        "Why do I get mild cramps before my period starts?",
        "Is a cycle variation of 2 days normal?",
        "How can I manage mild bloating and fatigue naturally?",
        "Can exercise help improve menstrual regularity?"
      ];

      for (const query of normalQueries) {
        const result = checkRedFlags(query);
        expect(result.hasRedFlags).toBe(false);
        expect(result.detectedFlags).toHaveLength(0);
        expect(result.advisoryDisclaimer).toBeNull();
      }
    });
  });

  describe("Prolonged absence of periods (Amenorrhea)", () => {
    it("triggers red-flag for missing periods over multiple months", () => {
      const queries = [
        "I have had no period for 3 months, is this okay?",
        "Haven't had my period in 90 days and feeling worried",
        "Missed period for 2 months now, what could it be?",
        "I have prolonged absence of periods",
        "My doctor mentioned amenorrhea previously"
      ];

      for (const query of queries) {
        const result = checkRedFlags(query);
        expect(result.hasRedFlags).toBe(true);
        expect(result.advisoryDisclaimer).toContain("medical evaluation");
      }
    });
  });

  describe("Excessive and prolonged bleeding", () => {
    it("triggers red-flag for hemorrhage and rapid pad saturation", () => {
      const queries = [
        "I am soaking through pads every hour today",
        "Passing blood clots larger than quarter and feeling weak",
        "I have been bleeding for more than 10 days without stopping",
        "I am experiencing heavy bleeding and hemorrhage"
      ];

      for (const query of queries) {
        const result = checkRedFlags(query);
        expect(result.hasRedFlags).toBe(true);
        expect(result.advisoryDisclaimer).not.toBeNull();
      }
    });
  });

  describe("Severe acute pain and neurological symptoms", () => {
    it("triggers red-flag for unbearable pain, fainting, and high fever", () => {
      const queries = [
        "I have severe pain in my pelvis and passed out",
        "Unbearable pain with fever and cramps",
        "I fainted from sudden sharp pain this morning",
        "Foul-smelling discharge and high fever with pain"
      ];

      for (const query of queries) {
        const result = checkRedFlags(query);
        expect(result.hasRedFlags).toBe(true);
        expect(result.advisoryDisclaimer).toContain("doctor or healthcare professional");
      }
    });
  });
});
