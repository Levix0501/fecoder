import { uploadImageToCos } from '@/lib/upload';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const result = await uploadImageToCos(formData.get('file') as File);
  return NextResponse.json({ success: true, data: result });
}
