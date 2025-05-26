import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HeroMain() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/20 px-4 py-16">
      <div className="max-w-5xl w-full space-y-12 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 animate-gradient-x">
              Quantum
            </span>{" "}
            Computational Agent
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI chatbot capable of performing complex calculations, data analysis, and autonomous task execution in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8V4m0 4 3-3m-3 3-3-3" />
                  <rect width="16" height="12" x="4" y="12" rx="2" />
                  <path d="M2 20h20" />
                </svg>
              </div>
              <CardTitle className="text-lg font-semibold mb-2">High-Performance Computing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Solves complex mathematical problems and scientific computations with unprecedented speed and accuracy.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16 8-8 8" />
                  <path d="m8 8 8 8" />
                </svg>
              </div>
              <CardTitle className="text-lg font-semibold mb-2">Autonomous Decision Making</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Executes complex workflows independently, adapting to changing conditions and optimizing for best outcomes.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 12v5h16a2 2 0 0 1 0 4H3v-4" />
                </svg>
              </div>
              <CardTitle className="text-lg font-semibold mb-2">Advanced Data Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analyzes vast datasets to extract insights, identify patterns, and generate actionable intelligence.</p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-10" />

        <Card className="relative rounded-xl overflow-hidden border shadow-md">
          <CardContent className="bg-card p-6 md:p-8">
            <div className="flex flex-col space-y-4">
              <div className="bg-primary/5 rounded-lg p-4 flex items-start">
                <div className="bg-primary/20 rounded-full size-8 flex items-center justify-center mr-4 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary mb-1">User</p>
                  <p className="text-sm">Calculate the optimal investment strategy for a $500,000 portfolio with a 10-year horizon, balancing growth and risk.</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 flex items-start">
                <div className="bg-secondary rounded-full size-8 flex items-center justify-center mr-4 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-secondary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.93 4.93 14.14 14.14" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Quantum Agent</p>
                  <p className="text-sm">Based on Monte Carlo simulations of 10,000 market scenarios, I recommend a 60/30/10 allocation (equities/bonds/alternatives) with dynamic rebalancing. This strategy yields a projected 7.8% annual return with a Sharpe ratio of 1.2. Would you like me to execute this strategy or adjust parameters?</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="font-medium">
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
          <Button size="lg" variant="outline" className="font-medium">
            View Demo
          </Button>
        </div>
      </div>
    </section>
  );
}