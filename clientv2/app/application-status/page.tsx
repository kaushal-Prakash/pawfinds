"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, Search, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

// Mock application data
const mockApplications = [
  {
    id: "APP-001",
    petName: "Buddy",
    petImage: "/golden-retriever-dog-happy.jpg",
    submittedDate: "2024-01-15",
    status: "under_review",
    statusMessage: "Your application is being reviewed by our adoption team.",
    nextSteps: "We'll contact you within 2-3 business days to schedule a meet and greet.",
  },
  {
    id: "APP-002",
    petName: "Luna",
    petImage: "/siamese-cat-blue-eyes.jpg",
    submittedDate: "2024-01-10",
    status: "approved",
    statusMessage: "Congratulations! Your application has been approved.",
    nextSteps: "Please contact us at (555) 123-4567 to schedule your adoption appointment.",
  },
  {
    id: "APP-003",
    petName: "Max",
    petImage: "/german-shepherd-dog-sitting.jpg",
    submittedDate: "2024-01-05",
    status: "rejected",
    statusMessage: "Unfortunately, we found another family that was a better match for Max.",
    nextSteps: "We encourage you to apply for other pets that might be a great fit for your family.",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "under_review":
      return <Clock className="h-5 w-5 text-yellow-500" />
    case "approved":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "under_review":
      return <Badge variant="secondary">Under Review</Badge>
    case "approved":
      return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
    case "rejected":
      return <Badge variant="destructive">Not Selected</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export default function ApplicationStatusPage() {
  const [applicationId, setApplicationId] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockApplications>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    // In a real app, this would search the backend
    const results = mockApplications.filter((app) => app.id.toLowerCase().includes(applicationId.toLowerCase()))
    setSearchResults(results)
    setHasSearched(true)
  }

  const showAllApplications = () => {
    setSearchResults(mockApplications)
    setHasSearched(true)
    setApplicationId("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <h1 className="text-2xl font-bold text-foreground">PawFinds</h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/browse">
              <Button variant="outline">Browse Pets</Button>
            </Link>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Application Status</h1>
            <p className="text-lg text-muted-foreground">Check the status of your adoption applications.</p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Find Your Application</CardTitle>
              <CardDescription>
                Enter your application ID to check the status, or view all recent applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="applicationId" className="sr-only">
                    Application ID
                  </Label>
                  <Input
                    id="applicationId"
                    placeholder="Enter application ID (e.g., APP-001)"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                  />
                </div>
                <Button onClick={handleSearch} disabled={!applicationId.trim()}>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline" onClick={showAllApplications}>
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {hasSearched && (
            <div className="space-y-6">
              {searchResults.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold text-foreground">
                    {applicationId ? "Search Results" : "Your Applications"}
                  </h2>

                  {searchResults.map((application) => (
                    <Card key={application.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={application.petImage || "/placeholder.svg"}
                              alt={application.petName}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <CardTitle className="flex items-center space-x-2">
                                <span>Application for {application.petName}</span>
                                {getStatusIcon(application.status)}
                              </CardTitle>
                              <CardDescription>
                                Application ID: {application.id} • Submitted:{" "}
                                {new Date(application.submittedDate).toLocaleDateString()}
                              </CardDescription>
                            </div>
                          </div>
                          {getStatusBadge(application.status)}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Current Status</h4>
                            <p className="text-muted-foreground">{application.statusMessage}</p>
                          </div>

                          <Separator />

                          <div>
                            <h4 className="font-semibold mb-2">Next Steps</h4>
                            <p className="text-muted-foreground">{application.nextSteps}</p>
                          </div>

                          {application.status === "approved" && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <h4 className="font-semibold text-green-800">Congratulations!</h4>
                              </div>
                              <p className="text-green-700 text-sm">
                                Your application has been approved. Please contact us as soon as possible to finalize
                                the adoption.
                              </p>
                            </div>
                          )}

                          {application.status === "under_review" && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <Clock className="h-5 w-5 text-yellow-600" />
                                <h4 className="font-semibold text-yellow-800">Under Review</h4>
                              </div>
                              <p className="text-yellow-700 text-sm">
                                Our team is carefully reviewing your application. We appreciate your patience.
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Applications Found</h3>
                    <p className="text-muted-foreground mb-6">
                      {applicationId
                        ? "We couldn't find an application with that ID. Please check the ID and try again."
                        : "You don't have any adoption applications yet."}
                    </p>
                    <Link href="/browse">
                      <Button>
                        <Heart className="mr-2 h-4 w-4" />
                        Browse Available Pets
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Help Section */}
          {!hasSearched && (
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Where can I find my application ID?</h4>
                    <p className="text-sm text-muted-foreground">
                      Your application ID was provided in the confirmation email you received after submitting your
                      application. It starts with "APP-" followed by numbers.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">How long does the review process take?</h4>
                    <p className="text-sm text-muted-foreground">
                      We typically review applications within 2-3 business days. Complex applications may take longer.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Contact Us</h4>
                    <p className="text-sm text-muted-foreground">
                      If you have questions about your application, please contact us at (555) 123-4567 or
                      adopt@pawfinds.org.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
