"use client";

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
import { useEffect } from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    console.log(theme);
  }, []);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-2xl">Habit Tracker</CardTitle>
          <CardDescription>
            Build consistency, one day at a time
          </CardDescription>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
            />
            <Moon className="h-4 w-4" />
          </div>
          <Avatar>
            <AvatarFallback>KS</AvatarFallback>
          </Avatar>
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
                      />
                      <FieldDescription>
                        {/* Optional helper text. */}
                      </FieldDescription>
                      <FieldError>{/* Validation message. */}</FieldError>
                    </Field>
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </CardHeader>
    </Card>
  );
};

export default Header;
