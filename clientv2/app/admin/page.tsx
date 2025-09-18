"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Heart, Users, PawPrint, FileText, CheckCircle, Clock, XCircle, Settings, LogOut } from "lucide-react"

// Mock data for analytics
const monthlyAdoptions = [
  { month: "Jan", adoptions: 12 },
  { month: "Feb", adoptions: 19 },
  { month: "Mar", adoptions: 15 },
  { month: "Apr", adoptions: 22 },
  { month: "May", adoptions: 28 },
  { month: "Jun", adoptions: 31 },
]

const petTypeData = [
  { name: "Dogs", value: 65, color: "#be123c" },
  { name: "Cats", value: 30, color: "#ec4899" },
  { name: "Other", value: 5, color: "#f472b6" },
]

const applicationStatusData = [
  { status: "Pending", count: 24 },
  { status: "Approved", count: 18 },
  { status: "Rejected", count: 8 },
]

const recentApplications = [
  {
    id: "APP-001",
    applicantName: "Sarah Johnson",
    petName: "Buddy",
    submittedDate: "2024-01-15",
    status: "pending",
  },
  {
    id: "APP-002",
    applicantName: "Mike Chen",
    petName: "Luna",
    submittedDate: "2024-01-14",
    status: "approved",
  },
  {
    id: "APP-003",
    applicantName: "Emily Davis",
    petName: "Max",
    submittedDate: "2024-01-13",
    status: "pending",
  },
  {
    id: "APP-004",
    applicantName: "John Smith",
    petName: "Bella",
    submittedDate: "2024-01-12",
    status: "rejected",
  },
]

const pendingPets = [
  {
    id: 7,
    name: "Rocky",
    type: "Dog",
    breed: "Pit Bull Mix",
    submittedBy: "City Animal Shelter",
    submittedDate: "2024-01-14",
    image: "/pit-bull-mix-dog.jpg",
  },
  {
    id: 8,
    name: "Whiskers",
    type: "Cat",
    breed: "Domestic Shorthair",
    submittedBy: "Rescue Angels",
    submittedDate: "2024-01-13",
    image: "/domestic-shorthair-cat.jpg",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      )
    case "approved":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </Badge>
      )
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              <h1 className="text-2xl font-bold text-foreground">PawFinds Admin</h1>
            </Link>
            <Badge variant="secondary">Administrator</Badge>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage pets, applications, and monitor platform activity.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="pets">Pet Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Adoptions</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Awaiting review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Pets</CardTitle>
                  <PawPrint className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">Ready for adoption</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Adoptions</CardTitle>
                  <CardDescription>Successful adoptions over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyAdoptions}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="adoptions" fill="var(--color-primary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pet Types Distribution</CardTitle>
                  <CardDescription>Breakdown of available pets by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={petTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {petTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest adoption applications requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplications.slice(0, 4).map((app) => (
                      <div key={app.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{app.applicantName}</p>
                          <p className="text-sm text-muted-foreground">
                            {app.id} • {app.petName} • {new Date(app.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Pet Approvals</CardTitle>
                  <CardDescription>New pets awaiting approval for listing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingPets.map((pet) => (
                      <div key={pet.id} className="flex items-center space-x-4">
                        <img
                          src={pet.image || "/placeholder.svg"}
                          alt={pet.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{pet.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {pet.breed} • {pet.submittedBy}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Management</CardTitle>
                <CardDescription>Review and manage adoption applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <Card key={app.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{app.applicantName}</h3>
                              {getStatusBadge(app.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Application {app.id} for {app.petName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Submitted: {new Date(app.submittedDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            {app.status === "pending" && (
                              <>
                                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="destructive">
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pets" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Pet Management</h2>
                <p className="text-muted-foreground">Manage pet listings and approvals</p>
              </div>
              <Button>
                <PawPrint className="mr-2 h-4 w-4" />
                Add New Pet
              </Button>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>New pets awaiting approval for public listing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingPets.map((pet) => (
                      <Card key={pet.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center space-x-4">
                            <img
                              src={pet.image || "/placeholder.svg"}
                              alt={pet.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{pet.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {pet.type} • {pet.breed}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Submitted by {pet.submittedBy} on {new Date(pet.submittedDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">User Management Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Advanced user management features will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
