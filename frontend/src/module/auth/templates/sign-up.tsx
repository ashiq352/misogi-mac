"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput } from "@/components/form/TextInput";
import { useAuthAPI } from "@/module/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { setCookies } from "@/lib/cookies";
import { USER_ROLE } from "@/enums";
import { routes } from "@/config/routes";

export default function SignUp() {
  const router = useRouter();
  const { useRegister } = useAuthAPI();
  const registerMutation = useRegister();

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      role: USER_ROLE.ARTIST,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      fullName: Yup.string().required("Full name is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
      role: Yup.mixed().oneOf(Object.values(USER_ROLE)),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      registerMutation.mutate(values, {
        onSuccess: (res) => {
          setCookies({ token: res.token, user: { role: res.user.role } });

          if (res.user.role === USER_ROLE.ARTIST) {
            router.push(routes.artist.dashboard);
          } else if (res.user.role === USER_ROLE.CURATOR) {
            router.push(routes.curator.dashboard);
          } else {
            router.push("/");
          }
        },
        onError: () => {
          setErrors({ email: "Account already exists" });
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          id="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <TextInput
          id="fullName"
          label="Full Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          error={formik.errors.fullName}
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value={USER_ROLE.ARTIST}>Artist</option>
            <option value={USER_ROLE.CURATOR}>Curator</option>
          </select>
          {formik.errors.role && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.role}</p>
          )}
        </div>
        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}
