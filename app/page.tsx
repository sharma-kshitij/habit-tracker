"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Flame, BarChart3 } from "lucide-react";
import Header from "@/components/header/Header";
import Today from "@/components/today/Today";
import { habitsAtom } from "@/components/state/state";
import { useAtomValue } from "jotai";
import { calculateCompletionPercentage } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function HabitTrackerHighFidelity() {
  const habits = useAtomValue(habitsAtom);
  const [completedPercent, setCompletedPercent] = useState(0);
  useEffect(() => {
    setCompletedPercent(calculateCompletionPercentage(habits));
  }, [habits]);
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
              <CardTitle>{completedPercent}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={completedPercent} />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardDescription>Active Habits</CardDescription>
              <CardTitle>{habits.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                className="bg-green-700 flex items-center justify-center text-white"
                variant="secondary"
              >
                On Track
              </Badge>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <div>
                <CardTitle>Coming Soon</CardTitle>
                {/* <CardDescription>Current Streak</CardDescription>
                <CardTitle>12 Days</CardTitle> */}
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
          <Today />

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <CardTitle>Coming Soon</CardTitle>
            {/* <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Habit Calendar</CardTitle>
                <CardDescription>Track consistency over time</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar />
              </CardContent>
            </Card> */}
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <CardTitle>Coming Soon</CardTitle>
            {/* <Card className="shadow-sm">
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
            </Card> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
