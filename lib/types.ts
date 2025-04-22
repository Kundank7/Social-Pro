export interface Order {
  id: string
  platform: string
  service: string
  quantity: number
  total: number
  name: string
  email: string
  message: string
  screenshot: string
  status: string
  createdAt: string
}

export interface Testimonial {
  id: string
  name: string
  title: string
  rating: number
  content: string
  approved: boolean
  avatar: string | null
  createdAt: string
}

export interface Service {
  id: string
  platform: string
  name: string
  price: number
}

export interface Admin {
  id: string
  username: string
  password: string
}
