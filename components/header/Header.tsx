import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Moon, Plus, Sun } from "lucide-react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

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
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { habitsAtom } from "../state/state";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [habit, setHabit] = useState("");
  const setHabits = useSetAtom(habitsAtom);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-2xl">Habit Tracker</CardTitle>
          <CardDescription>
            Build consistency, one day at a time
          </CardDescription>
          <Drawer>
            <DrawerTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Habit
              </Button>
            </DrawerTrigger>
            <DrawerContent className="flex items-center justify-center min-w-sm">
              <div className="min-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Add Habit</DrawerTitle>
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
                      <FieldError>{/* Validation message. */}</FieldError>
                    </Field>
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button
                    onClick={() => {
                      setHabits((prev) => [
                        ...prev,
                        { id: prev.length + 1, name: habit, completed: false },
                      ]);
                      setHabit("");
                    }}
                  >
                    Submit
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {theme == "dark" ? (
              <Sun onClick={() => setTheme("light")} className="h-4 w-4" />
            ) : (
              <Moon onClick={() => setTheme("dark")} className="h-4 w-4" />
            )}
          </div>
          <Avatar>
            <AvatarFallback>KS</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
    </Card>
  );
};

export default Header;
