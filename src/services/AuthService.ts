import type { User } from "../dto/auth";
import { BaseService } from "./BaseService";

export class AuthService extends BaseService {
  constructor() {
    super(import.meta.env.VITE_API_URL || "http://localhost:3000");
  }
  async getCurrentUser(): Promise<User> {
    return this.request("/auth/me", {
      method: "GET",
    });
  }

  async login(email: string, password: string): Promise<User> {
    await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return this.getCurrentUser();
  }

  async register(email: string, password: string): Promise<User> {
    await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return this.getCurrentUser();
  }

  async logout(userId: string): Promise<void> {
    await this.request(`/auth/logout/${userId}`, {
      method: "POST",
    });
  }
}
