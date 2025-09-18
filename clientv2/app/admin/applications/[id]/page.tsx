"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle, XCircle, User, Home, Phone, Mail, MapPin, Users, PawPrint } from "lucide-react"

// Mock application data
const mockApplication = {
  id: "APP-001",
  applicantName: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "(555) 123-4567",
  address: "123 Main St, San Francisco, CA 94102",
  petName: "Buddy",
  petImage: "/golden-retriever-dog-happy.jpg",
  submittedDate: "2024-01-15",
  status: "pending",
  personalInfo: {
    firstName: "Sarah",
    lastName: "Johnson",
    dateOfBirth: "1985-03-15",
  },
  housingInfo: {
    housingType: "house",
    ownOrRent: "own",
    householdSize: "2",
    hasChildren: "no",
    hasOtherPets: "yes",
    otherPetsDetails: "One 5-year-old cat named Whiskers, very friendly and social",
  },
  experience: {
    petExperience:
      "I've had pets my entire life, including dogs and cats. I understand the commitment required and have experience with training and veterinary care.",
    workSchedule:
      "I work from home 3 days a week and have flexible hours. My partner works part-time, so someone is usually home.",
    exerciseCommitment:
      "I plan to walk Buddy twice daily and take him to the dog park on weekends. We have a large fenced backyard.",
    whyAdopt:
      "We recently lost our 12-year-old Golden Retriever and are ready to open our hearts to another dog. Buddy's profile shows he has the perfect temperament for our family.",
  },
  references: {
    veterinarianName: "Dr. Smith",
    veterinarianPhone: "(555) 987-6543",
    personalReference1Name: "Mike Chen",
    personalReference1Phone: "(555) 456-7890",
  },
}

export default function ApplicationDetailPage() {
  const params = useParams()
  const applicationId = params.id as string
  const [reviewNotes, setReviewNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  // In a real app, fetch application data based on ID
  const application = mockApplication

  const handleApprove = async () => {
    setIsProcessing(true)
    try {
      // TODO: API call to approve application
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await fetch("/api/emails/adoption-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: application.email,
          applicantName: application.applicantName,
          petName: application.petName,
          status: "approved",
          message:
            "Congratulations! Your application has been approved. We will contact you soon to arrange a meet and greet.",
        }),
      })

      toast({
        title: "Application Approved",
        description: "The applicant will be notified via email.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve application.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    setIsProcessing(true)
    try {
      // TODO: API call to reject application
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await fetch("/api/emails/adoption-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: application.email,
          applicantName: application.applicantName,
          petName: application.petName,
          status: "rejected",
          message:
            "Thank you for your interest. While we found another family for this pet, we encourage you to apply for other pets that might be a great fit.",
        }),
      })

      toast({
        title: "Application Rejected",
        description: "The applicant will be notified via email.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject application.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Admin Dashboard</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant={application.status === "pending" ? "secondary" : "outline"}>
              {application.status === "pending" ? "Pending Review" : application.status}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Application Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Application Review</CardTitle>
                  <CardDescription>
                    Application {application.id} • Submitted {new Date(application.submittedDate).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src={application.petImage || "/placeholder.svg"}
                    alt={application.petName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{application.petName}</h3>
                    <p className="text-sm text-muted-foreground">Golden Retriever</p>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Applicant Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Applicant Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      {application.personalInfo.firstName} {application.personalInfo.lastName}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      {application.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      {application.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      {application.address}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Household Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                      {application.housingInfo.housingType} ({application.housingInfo.ownOrRent})
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      {application.housingInfo.householdSize} people
                    </div>
                    <div className="flex items-center">
                      <PawPrint className="h-4 w-4 mr-2 text-muted-foreground" />
                      {application.housingInfo.hasOtherPets === "yes" ? "Has other pets" : "No other pets"}
                    </div>
                  </div>
                </div>
              </div>

              {application.housingInfo.hasOtherPets === "yes" && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Other Pets</h4>
                    <p className="text-sm text-muted-foreground">{application.housingInfo.otherPetsDetails}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Experience & Motivation */}
          <Card>
            <CardHeader>
              <CardTitle>Experience & Motivation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Pet Experience</h4>
                <p className="text-sm text-muted-foreground">{application.experience.petExperience}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Work Schedule</h4>
                <p className="text-sm text-muted-foreground">{application.experience.workSchedule}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Exercise Commitment</h4>
                <p className="text-sm text-muted-foreground">{application.experience.exerciseCommitment}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Why This Pet?</h4>
                <p className="text-sm text-muted-foreground">{application.experience.whyAdopt}</p>
              </div>
            </CardContent>
          </Card>

          {/* References */}
          <Card>
            <CardHeader>
              <CardTitle>References</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Veterinarian</h4>
                  <div className="text-sm space-y-1">
                    <p>{application.references.veterinarianName}</p>
                    <p className="text-muted-foreground">{application.references.veterinarianPhone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Personal Reference</h4>
                  <div className="text-sm space-y-1">
                    <p>{application.references.personalReference1Name}</p>
                    <p className="text-muted-foreground">{application.references.personalReference1Phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Review Notes</CardTitle>
              <CardDescription>Add internal notes about this application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="reviewNotes">Notes</Label>
                <Textarea
                  id="reviewNotes"
                  placeholder="Add your review notes here..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {application.status === "pending" && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center space-x-4">
                  <Button onClick={handleApprove} disabled={isProcessing} className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {isProcessing ? "Processing..." : "Approve Application"}
                  </Button>
                  <Button onClick={handleReject} disabled={isProcessing} variant="destructive">
                    <XCircle className="mr-2 h-4 w-4" />
                    {isProcessing ? "Processing..." : "Reject Application"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
