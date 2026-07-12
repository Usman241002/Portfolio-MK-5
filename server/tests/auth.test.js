import { loginUser, verifyUser, validLoginPayload } from "./helpers/authHelpers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

describe("Auth API", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("POST /api/auth/login", () => {
    it("should log in user and provide a token", async () => {
      const res = await loginUser()

      expect(res.status).toBe(200)
      expect(res.body.message).toBe("Login successful")
      expect(res.body.token).toBeDefined()
    })

    it("should return 400 if invalid input", async () => {
      const payload = {
        email: "not_email",
        password: 1234
      }

      const res = await loginUser(payload)

      expect(res.status).toBe(400)
    })

    it("should return 401 if email is incorrect", async () => {
      const payload = {
        ...validLoginPayload,
        email: "wrongEmail@gmail.com"
      }

      const res = await loginUser(payload)

      expect(res.status).toBe(401)
      expect(res.body.message).toBe("Invalid username or password")
    })

    it("should return 401 if password is incorrect", async () => {
      const payload = {
        ...validLoginPayload,
        password: "incorrectPassword"
      }

      const res = await loginUser(payload)

      expect(res.status).toBe(401)
      expect(res.body.message).toBe("Invalid username or password")

    })

    it("should return 500 for database error", async () => {
      jest
        .spyOn(bcrypt, "compareSync")
        .mockImplementation(() => {
          throw new Error("Simulated Server Error");
        });

      const res = await loginUser();

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to login user");
    });
  })

  describe("POST /api/auth/verify", () => {

    it("should return 200 if user verified", async () => {
      const res = await verifyUser()

      expect(res.status).toBe(200)
    })

    it("should return 401 if token is invalid", async () => {
      const token = jwt.sign({}, "invalid_secret_key");
      const res = await verifyUser(token);

      expect(res.status).toBe(401);
    });

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });
      const res = await verifyUser(token); // Adjust args based on your helper signature

      expect(res.status).toBe(401);
    });
  });
})
