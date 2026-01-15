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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { useAtom } from "jotai";
import { habitsAtom } from "@/components/state/state";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { set } from "date-fns";

const Today = () => {
  const [habits, setHabits] = useAtom(habitsAtom);

  const [open, setOpen] = useState(false);
  const [habit, setHabit] = useState("");
  const [alert, setAlert] = useState("");

  const submit = () => {
    if (habit.trim() === "") {
      setAlert("Habit cannot be empty");
      return;
    }
    setHabits((prev) => {
      return prev.map((oldHabit) => {
        if (oldHabit.name === habit) {
          return { ...oldHabit, name: habit };
        }
        return oldHabit;
      });
    });
    setHabit("");
    setOpen(false);
  };

  useEffect(() => {
    if (habit.trim() !== "") {
      setAlert("");
    }
  }, [habit]);

  return (
    <TabsContent value="today" className="space-y-4">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Habit
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex items-center justify-center min-w-sm">
          <div className="min-w-sm">
            <DrawerHeader>
              <DrawerTitle>Edit Habit</DrawerTitle>
              <DrawerDescription asChild>
                <Field>
                  <FieldLabel htmlFor="habit-name" asChild>
                    Label
                  </FieldLabel>
                  <Input
                    id="habit-name"
                    autoComplete="off"
                    placeholder="Drink Water"
                    value={habit}
                    onChange={(e) => {
                      setHabit(e.target.value);
                    }}
                  />
                  <FieldDescription>
                    {/* Optional helper text. */}
                  </FieldDescription>
                  <FieldError>{alert}</FieldError>
                </Field>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={() => submit()}>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
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
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setOpen(true);
                  setHabit(habit.name);
                }}
              >
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
