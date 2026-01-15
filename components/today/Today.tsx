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
  FieldContent,
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
import { habitType } from "../types/types";
import { Switch } from "@/components/ui/switch";

const Today = () => {
  const [habits, setHabits] = useAtom(habitsAtom);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [editHabit, setEditHabit] = useState<habitType>();

  const submit = () => {
    if (alert) {
      return;
    }
    setHabits((prev) => {
      return prev.map((oldHabit) => {
        if (oldHabit.id === editHabit?.id) {
          return { ...oldHabit, name: editHabit.name, daily: editHabit.daily };
        } else return oldHabit;
      });
    });
    setOpen(false);
  };

  return (
    <TabsContent value="today" className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Today's Habits</CardTitle>
          <CardDescription>Mark habits as you complete them</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition"
              onClick={() => {
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
            >
              <div className="flex items-center gap-3">
                <Checkbox checked={habit.completed} />
                <span className="font-medium">{habit.name}</span>
                {habit.daily && <Badge>Daily</Badge>}
              </div>

              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditHabit(habit)}
                  >
                    Edit
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
                            value={editHabit?.name}
                            onChange={(e) => {
                              setEditHabit((prev) => {
                                if (!prev) return prev;
                                return { ...prev, name: e.target.value };
                              });
                            }}
                          />
                          <FieldDescription>
                            {/* Optional helper text. */}
                          </FieldDescription>
                          <FieldError>{alert}</FieldError>
                        </Field>
                      </DrawerDescription>
                      <Field className="px-1" orientation="horizontal">
                        <FieldContent>
                          <FieldLabel htmlFor="daily">Daily</FieldLabel>
                        </FieldContent>
                        <Switch
                          id="daily"
                          checked={editHabit?.daily}
                          onCheckedChange={() =>
                            setEditHabit((prev) => {
                              if (!prev) return prev;
                              return { ...prev, daily: !prev.daily };
                            })
                          }
                        />
                      </Field>
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
            </div>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Today;
