import Profile from "@/components/layout/pages/profile";
import RiwayatTransaksi from "@/components/layout/pages/riwayatTransaksi";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ position: string }>;
}) {
  const position = (await searchParams).position;

  const components = {
    profil: <Profile />,
    "riwayat-transaksi": <RiwayatTransaksi />,
  };

  return (
    <>
      {!components[position] ? (
        <div>Tidak ditemukan</div>
      ) : (
        components[position]
      )}
    </>
  );
}
