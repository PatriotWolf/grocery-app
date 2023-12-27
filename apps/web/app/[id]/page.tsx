'use client';

interface Props {
  params: { id: string };
}
const Page = ({ params: { id } }: Props) => {
  return <>{id}</>;
};

export default Page;
