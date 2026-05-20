import { EditCvPage } from '@editor/pages';

interface EditCvRouteProps {
  params: Promise<{ id: string }>;
}

export default async function EditCvRoute({ params }: EditCvRouteProps) {
  const { id } = await params;
  return <EditCvPage id={id} />;
}
