import { users, contacts, type User, type InsertUser, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  incrementVisitorCount(): Promise<number>;
  getVisitorStats(): Promise<{ totalVisitors: number; currentConnected: number }>;
  addConnectedUser(sessionId: string): void;
  removeConnectedUser(sessionId: string): void;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentContactId: number;
  private totalVisitors: number;
  private connectedUsers: Set<string>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.totalVisitors = 0;
    this.connectedUsers = new Set();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async incrementVisitorCount(): Promise<number> {
    this.totalVisitors++;
    return this.totalVisitors;
  }

  async getVisitorStats(): Promise<{ totalVisitors: number; currentConnected: number }> {
    return {
      totalVisitors: this.totalVisitors,
      currentConnected: this.connectedUsers.size
    };
  }

  addConnectedUser(sessionId: string): void {
    this.connectedUsers.add(sessionId);
  }

  removeConnectedUser(sessionId: string): void {
    this.connectedUsers.delete(sessionId);
  }

  getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }
}

export const storage = new MemStorage();
