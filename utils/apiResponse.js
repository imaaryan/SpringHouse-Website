import { NextResponse } from "next/server";

export const sendResponse = (
  success,
  data = null,
  error = null,
  status = 200,
) => {
  if (success) {
    return NextResponse.json({ success: true, data }, { status });
  }
  return NextResponse.json(
    {
      success: false,
      error: error?.message || error || "Something went wrong",
    },
    { status },
  );
};
