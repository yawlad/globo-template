"use server";

import { redirect } from "next/navigation";

import { createAdminSession, destroyAdminSession, isAdminAuthenticated } from "@/lib/admin/auth";
import { updateSiteContentSection } from "@/lib/content/store";
import {
  isHomeContent,
  isNavigationContent,
  isRentalArray,
  isShopArray,
  isTechnicalSpaceArray,
} from "@/lib/content/validators";

function getTextareaJson(formData: FormData) {
  return String(formData.get("json") ?? "");
}

function parseJson<T>(rawValue: string, guard: (value: unknown) => value is T, errorMessage: string) {
  let parsedValue: unknown;

  try {
    parsedValue = JSON.parse(rawValue);
  } catch {
    throw new Error("JSON не удалось разобрать. Проверьте синтаксис.");
  }

  if (!guard(parsedValue)) {
    throw new Error(errorMessage);
  }

  return parsedValue;
}

async function ensureAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin?error=auth");
  }
}

export async function loginAdmin(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (username !== "admin" || password !== "admin") {
    redirect("/admin?error=invalid_credentials");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await destroyAdminSession();
  redirect("/admin");
}

export async function saveNavigationContent(formData: FormData) {
  await ensureAdmin();

  try {
    const content = parseJson(
      getTextareaJson(formData),
      isNavigationContent,
      "Структура блока navigation не совпадает с ожидаемой.",
    );
    await updateSiteContentSection("navigation", content);
    redirect("/admin?saved=navigation");
  } catch (error) {
    const message =
      error instanceof Error ? encodeURIComponent(error.message) : "Не удалось сохранить navigation.";
    redirect(`/admin?section=navigation&error=${message}`);
  }
}

export async function saveHomeContent(formData: FormData) {
  await ensureAdmin();

  try {
    const content = parseJson(
      getTextareaJson(formData),
      isHomeContent,
      "Структура блока home не совпадает с ожидаемой.",
    );
    await updateSiteContentSection("home", content);
    redirect("/admin?saved=home");
  } catch (error) {
    const message =
      error instanceof Error ? encodeURIComponent(error.message) : "Не удалось сохранить home.";
    redirect(`/admin?section=home&error=${message}`);
  }
}

export async function saveShopsContent(formData: FormData) {
  await ensureAdmin();

  try {
    const content = parseJson(
      getTextareaJson(formData),
      isShopArray,
      "Массив shops содержит невалидные элементы.",
    );
    await updateSiteContentSection("shops", content);
    redirect("/admin?saved=shops");
  } catch (error) {
    const message =
      error instanceof Error ? encodeURIComponent(error.message) : "Не удалось сохранить shops.";
    redirect(`/admin?section=shops&error=${message}`);
  }
}

export async function saveRentalsContent(formData: FormData) {
  await ensureAdmin();

  try {
    const content = parseJson(
      getTextareaJson(formData),
      isRentalArray,
      "Массив rentals содержит невалидные элементы.",
    );
    await updateSiteContentSection("rentals", content);
    redirect("/admin?saved=rentals");
  } catch (error) {
    const message =
      error instanceof Error ? encodeURIComponent(error.message) : "Не удалось сохранить rentals.";
    redirect(`/admin?section=rentals&error=${message}`);
  }
}

export async function saveTechnicalSpacesContent(formData: FormData) {
  await ensureAdmin();

  try {
    const content = parseJson(
      getTextareaJson(formData),
      isTechnicalSpaceArray,
      "Массив technicalSpaces содержит невалидные элементы.",
    );
    await updateSiteContentSection("technicalSpaces", content);
    redirect("/admin?saved=technicalSpaces");
  } catch (error) {
    const message =
      error instanceof Error
        ? encodeURIComponent(error.message)
        : "Не удалось сохранить technicalSpaces.";
    redirect(`/admin?section=technicalSpaces&error=${message}`);
  }
}
