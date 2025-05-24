
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, Check } from 'lucide-react';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
};

export const MessageManagement = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
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

  const handleViewMessage = async (message: Message) => {
    setCurrentMessage(message);
    setIsViewDialogOpen(true);
    
    // Mark as read if not already
    if (!message.read) {
      try {
        const { error } = await supabase
          .from('messages')
          .update({ read: true })
          .eq('id', message.id);

        if (error) throw error;
        
        setMessages(messages.map(m => 
          m.id === message.id ? { ...m, read: true } : m
        ));
        
        setCurrentMessage({ ...message, read: true });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Messages</h2>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No messages found.
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{formatDate(message.created_at)}</TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>
                    {message.read ? (
                      <Badge className="bg-green-500">Read</Badge>
                    ) : (
                      <Badge className="bg-blue-500">New</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleViewMessage(message)}>
                      <Eye className="h-4 w-4 mr-2" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {currentMessage && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>From:</strong> {currentMessage.name}</p>
                  <p><strong>Email:</strong> {currentMessage.email}</p>
                  <p><strong>Date:</strong> {formatDate(currentMessage.created_at)}</p>
                </div>
                {currentMessage.read ? (
                  <Badge className="bg-green-500 flex items-center">
                    <Check className="h-3 w-3 mr-1" /> Read
                  </Badge>
                ) : (
                  <Badge className="bg-blue-500">New</Badge>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Message:</h3>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p>{currentMessage.message}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="secondary" className="w-full">
                  Reply via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
