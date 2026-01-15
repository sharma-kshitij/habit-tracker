import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAtom } from "jotai";
import { habitsAtom } from "@/components/state/state";

const Today = () => {
  const [habits, setHabits] = useAtom(habitsAtom);
  return (
    <TabsContent value="today" className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Today's Habits</CardTitle>
          <CardDescription>Mark habits as you complete them</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {habits.map((habit, index) => (
            <div
              key={habit.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={habit.completed}
                  onCheckedChange={() => {
                    setHabits(() => {
                      return habits.map((oldHabit) => {
                        if (oldHabit.id === habit.id) {
                          return {
                            ...oldHabit,
                            completed: !oldHabit.completed,
                          };
                        }
                        return oldHabit;
                      });
                    });
                  }}
                />
                <span className="font-medium">{habit.name}</span>
                {index === 0 && <Badge>Daily</Badge>}
              </div>
              <Button size="sm" variant="ghost">
                Edit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Today;
