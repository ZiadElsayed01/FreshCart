import RecentProducts from "./../RecentProducts/RecentProducts";

export default function Products() {
  return (
    <div className="py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-2 text-center">
          All Products
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Browse our complete collection of products
        </p>
        <RecentProducts />
      </div>
    </div>
  );
}
