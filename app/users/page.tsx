
import React from "react";
import EmptyState from "../components/EmptyState";
import Sidebar from "../components/sidebar/Sidebar"

const Users = () => {
  return (
    <Sidebar>
      <div className = "hidden lg:block lg:pl-80 h-full">
        <EmptyState />
      </div>
    </Sidebar>
  )
}

export default Users