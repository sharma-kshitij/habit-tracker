import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Flame, BarChart3 } from "lucide-react";
import Header from "@/components/header/Header";

export default function HabitTrackerHighFidelity() {
  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navigation */}
        <Header />
        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardDescription>Today's Completion</CardDescription>
              <CardTitle>60%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={60} />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardDescription>Active Habits</CardDescription>
              <CardTitle>5</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">On Track</Badge>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <div>
                <CardDescription>Current Streak</CardDescription>
                <CardTitle>12 Days</CardTitle>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          {/* Today Tab */}
          <TabsContent value="today" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Today's Habits</CardTitle>
                <CardDescription>
                  Mark habits as you complete them
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Exercise", "Read 20 mins", "Drink 3L Water", "Meditate"].map(
                  (habit, index) => (
                    <div
                      key={habit}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox />
                        <span className="font-medium">{habit}</span>
                        {index === 0 && <Badge>Daily</Badge>}
                      </div>
                      <Button size="sm" variant="ghost">
                        Edit
                      </Button>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Habit Calendar</CardTitle>
                <CardDescription>Track consistency over time</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Your habit performance</CardDescription>
                </div>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Filter by habit name" />
                <div className="h-48 rounded-xl border border-dashed flex items-center justify-center text-muted-foreground">
                  Charts & Insights (Recharts)
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
