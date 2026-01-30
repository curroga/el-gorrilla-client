import { describe, it, expect, vi, beforeEach } from 'vitest'
import { signupService, loginService, verifyService } from '@/services/auth.service'
import service from '@/services/config.service'

vi.mock('@/services/config.service', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn()
  }
}))

describe('auth.service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('signupService', () => {
    it('should call POST /auth/signup with user data', async () => {
      const newUser = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      }
      const mockResponse = { data: { message: 'User created' } }
      service.post.mockResolvedValue(mockResponse)

      const result = await signupService(newUser)

      expect(service.post).toHaveBeenCalledWith('/auth/signup', newUser)
      expect(service.post).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse)
    })

    it('should propagate errors from the API', async () => {
      const newUser = { email: 'test@example.com', password: '123' }
      const error = new Error('Email already exists')
      error.response = { status: 400, data: { message: 'Email already exists' } }
      service.post.mockRejectedValue(error)

      await expect(signupService(newUser)).rejects.toThrow('Email already exists')
    })

    it('should handle empty user data', async () => {
      const emptyUser = {}
      service.post.mockResolvedValue({ data: {} })

      await signupService(emptyUser)

      expect(service.post).toHaveBeenCalledWith('/auth/signup', emptyUser)
    })
  })

  describe('loginService', () => {
    it('should call POST /auth/login with credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      }
      const mockResponse = { data: { authToken: 'jwt-token-123' } }
      service.post.mockResolvedValue(mockResponse)

      const result = await loginService(credentials)

      expect(service.post).toHaveBeenCalledWith('/auth/login', credentials)
      expect(service.post).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse)
    })

    it('should propagate authentication errors', async () => {
      const credentials = { email: 'test@example.com', password: 'wrong' }
      const error = new Error('Invalid credentials')
      error.response = { status: 401, data: { message: 'Invalid credentials' } }
      service.post.mockRejectedValue(error)

      await expect(loginService(credentials)).rejects.toThrow('Invalid credentials')
    })

    it('should handle network errors', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' }
      const networkError = new Error('Network Error')
      service.post.mockRejectedValue(networkError)

      await expect(loginService(credentials)).rejects.toThrow('Network Error')
    })
  })

  describe('verifyService', () => {
    it('should call GET /auth/verify', async () => {
      const mockResponse = {
        data: {
          _id: 'user123',
          email: 'test@example.com',
          name: 'Test User',
          role: 'user'
        }
      }
      service.get.mockResolvedValue(mockResponse)

      const result = await verifyService()

      expect(service.get).toHaveBeenCalledWith('/auth/verify')
      expect(service.get).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse)
    })

    it('should propagate unauthorized errors', async () => {
      const error = new Error('Token expired')
      error.response = { status: 401, data: { message: 'Token expired' } }
      service.get.mockRejectedValue(error)

      await expect(verifyService()).rejects.toThrow('Token expired')
    })

    it('should handle missing token scenario', async () => {
      const error = new Error('No token provided')
      error.response = { status: 401, data: { message: 'No token provided' } }
      service.get.mockRejectedValue(error)

      await expect(verifyService()).rejects.toThrow('No token provided')
    })
  })
})
