"use client";
import { useParams } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";

export default function EditProject() {
  const { id } = useParams();
  return <ProjectForm id={id} />;
}
