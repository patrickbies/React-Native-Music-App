import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { api } from "@/convex/_generated/api";
import UserPostList from "../general/UserPostList";

type ProfilePage = {
  userData: typeof api.tasks.queryUser._returnType;
};

const ProfilePage = ({ userData }: ProfilePage) => {

  if (!userData) return;
  return (
      <UserPostList 
        listHeader={<>
          <ProfileHeader metadata={userData?.metadata} />
          <ProfileTabs />
        </>}
        posts={userData.userPosts.map(e => ({isPost: true, ...e}))}
      />
  );
};

export default ProfilePage;