import type React from "react";
import { Github, Users, Search, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import SearchLandingPage from "@/components/SearchLandingPage";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-background py-20 md:py-28">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              <span className="ml-2 font-medium">
                Discover • Contribute • Grow
              </span>
            </div>

            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Your personal <span className="text-primary">open source</span>{" "}
                radar
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                Find projects that match your skills, track your contributions,
                and build your developer profile in the open source community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={"/login"}>
                <Button size="lg" className="gap-2">
                  <Github className="h-5 w-5" />
                  <span>Connect with GitHub</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SearchLandingPage />

      {/* Features Section */}
      <section className="bg-muted/40 py-20 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <Badge variant="outline" className="px-3 py-1 text-sm">
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to excel in open source
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Our platform provides powerful tools to help you find the perfect
              projects, track your progress, and showcase your contributions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Search className="h-6 w-6 text-primary" />}
              title="Smart Project Discovery"
              description="Find repositories that match your skills, interests, and experience level with our intelligent matching algorithm."
            />
            <FeatureCard
              icon={<BarChart2 className="h-6 w-6 text-primary" />}
              title="Contribution Analytics"
              description="Track your open source journey with detailed statistics and visualizations of your contributions over time."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-primary" />}
              title="Community Connections"
              description="Connect with other contributors, join teams, and build your network within the open source community."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20  flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <Badge variant="outline" className="px-3 py-1 text-sm">
              How It Works
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Start contributing in three simple steps
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Our streamlined process helps you go from sign-up to your first
              contribution quickly and easily.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              number="01"
              title="Connect your GitHub account"
              description="Link your GitHub profile to analyze your skills and experience automatically."
            />
            <StepCard
              number="02"
              title="Discover matching projects"
              description="Browse personalized project recommendations based on your profile and preferences."
            />
            <StepCard
              number="03"
              title="Track your contributions"
              description="Monitor your progress, set goals, and showcase your open source achievements."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20  flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to start your open source journey?
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Join thousands of developers who are discovering projects, making
              contributions, and building their profiles.
            </p>
            <Link to={"/login"}>
              <Button size="lg" variant="secondary" className="gap-2">
                <Github className="h-5 w-5" />
                <span>Connect with GitHub</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute -right-5 -top-6 text-8xl font-bold text-primary/10">
        {number}
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
