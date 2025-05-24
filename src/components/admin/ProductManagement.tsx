
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_urls: string[];
};

export const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    category: '',
    image_urls: [],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      // Ensure required fields are present
      if (!currentProduct.name || currentProduct.price === undefined) {
        toast({
          title: "Error",
          description: "Name and price are required fields",
          variant: "destructive",
        });
        return;
      }
      
      const productData = {
        ...currentProduct,
        image_urls: imageFile 
          ? [...(currentProduct.image_urls || []), imageUrl] 
          : currentProduct.image_urls,
      };
      
      if (isEditing && currentProduct.id) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', currentProduct.id);
          
        if (error) throw error;
        toast({
          title: "Success",
          description: "Product updated successfully!",
        });
      } else {
        // Make sure name and price are provided for new products
        const { error } = await supabase
          .from('products')
          .insert([productData as { name: string; price: number; description?: string; category?: string; image_urls?: string[] }]);
          
        if (error) throw error;
        toast({
          title: "Success",
          description: "Product added successfully!",
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        toast({
          title: "Success",
          description: "Product deleted successfully!",
        });
        fetchProducts();
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      name: '',
      price: 0,
      description: '',
      category: '',
      image_urls: [],
    });
    setImageFile(null);
    setIsEditing(false);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No products found. Add your first product!
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.category || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleInputChange}
                  placeholder="Product name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Price</label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Input
                  id="category"
                  name="category"
                  value={currentProduct.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">
                  {currentProduct.image_urls && currentProduct.image_urls.length > 0 
                    ? "Add Another Image" 
                    : "Product Image"
                  }
                </label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {currentProduct.image_urls && currentProduct.image_urls.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Current Images:</p>
                    <div className="flex gap-2 overflow-auto">
                      {currentProduct.image_urls.map((url, index) => (
                        <img 
                          key={index} 
                          src={url} 
                          alt={`Product ${index}`} 
                          className="h-16 w-16 object-cover rounded border" 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {isEditing ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
