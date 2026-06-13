// Mise en page de l'administration : l'authentification et le RBAC seront ajoutés
// lorsque Supabase Auth sera activé. Voir `middleware.ts` pour la base du garde-fou.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Barre latérale à implémenter dans la phase Dashboard */}
        <aside className="w-64 min-h-screen bg-[#1a5c5c] hidden lg:block" />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
