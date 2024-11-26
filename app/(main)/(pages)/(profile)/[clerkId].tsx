import {
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useConvex } from "convex/react";
import { useLoading } from "@/context/LoadingContext";
import { api } from "@/convex/_generated/api";
import ProfilePage from "@/components/profile/ProfilePage";

const Profile = () => {
  const { clerkId: userId } = useLocalSearchParams<{ clerkId: string }>();
  const conv = useConvex();
  const { showLoading, hideLoading } = useLoading();
  const [userData, setUserData] =
    useState<typeof api.tasks.queryUser._returnType>();
  const nav = useNavigation();

  const grabProfile = async () => {
    if (!userId) {
      console.error("Invalid clerkId. Redirecting...");
      router.back();
      return;
    }

    const data = await conv.query(api.tasks.queryUser, { uid: userId });

    if (!data) {
      console.warn("No user found. Redirecting...");
      router.back();
      return;
    }

    setUserData(data);
  };

  useEffect(() => {
    showLoading();
    grabProfile().then(() => hideLoading());
  }, [userId]);

  return (
    <ProfilePage userData={userData!}/>
  );
};

export default Profile;