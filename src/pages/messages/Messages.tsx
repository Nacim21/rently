import { Card, CardHeader, CardTitle } from './components/card';
import { Avatar } from './components/avatar';
import { Input } from './components/input';
import { Button } from "@/components/ui/button";
import { ScrollArea } from './components/scroll-area';
// Icons needed for search, header, and send button.
import { Search, Phone, Video, MoreVertical, Send, Paperclip } from 'lucide-react';

/* Left Panel */
const ConversationList = () => {
  return (
    // Primary Card Container
    <Card className="h-full rounded-2xl border-gray-200 shadow-xl flex flex-col w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold">Messages</CardTitle>
      </CardHeader>
      
      {/* Search Bar Area */}
      <div className="p-4 pt-0">
        <div className="relative">
          {/* Search Icon */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          {/* Input field */}
          <Input 
            placeholder="Search conversations..." 
            className="pl-10 rounded-xl bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* List of Conversations Area */}
      <ScrollArea className="flex-1">
        {/* Static Placeholder Text */}
        <div className="p-4 text-center text-gray-400 h-full flex items-center justify-center">
          <p>-- Contact list loads here --</p>
        </div>
      </ScrollArea>
    </Card>
  );
};


/* Right Panel */
const ChatWindow = () => {
    return (
        // Primary Card Container
        <Card className="flex flex-col h-full rounded-2xl border-gray-200 shadow-xl">
            
            {/* Chat Header: Contact Info and action buttons */}
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-3">
                    {/* Placeholder Avatar */}
                    <Avatar className="h-10 w-10 bg-gray-400 text-white font-semibold">
                    </Avatar>
                </div>
                {/* Right-side icons (Call, Video, Menu) */}
                <div className="flex space-x-4 text-gray-500">
                    <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                </div>
            </CardHeader>

            {/* Message Display Area */}
            <ScrollArea className="flex-1 p-6">
                <div className="h-full flex items-center justify-center text-gray-400">
                    <p>-- Messages appear here --</p>
                </div>
            </ScrollArea>

            {/* Message Input Bar */}
            <div className="p-4 border-t bg-white flex items-center space-x-2 rounded-b-2xl">
                {/* Paperclip Button */}
                <Button variant="ghost" size="icon" className="text-gray-500"><Paperclip className="h-5 w-5" /></Button>
                <Input
                    placeholder="Type a message..."
                    className="flex-1 rounded-full py-6 px-4 bg-gray-50 border-gray-200"
                />
                {/* Send Button */}
                <Button 
                    type="submit" 
                    size="icon" 
                    className="rounded-full h-10 w-10 bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                    <Send className="h-5 w-5 -rotate-45" />
                </Button>
            </div>
        </Card>
    );
};


// Renamed from 'App' to 'MessagesPage' to avoid conflict with your App.tsx
export default function MessagesPage() { 
    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-7xl mx-auto h-[calc(100vh-64px)]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
                    
                    {/* A. LEFT PANEL */}
                    <div className="col-span-12 md:col-span-4 lg:col-span-3 h-full">
                        <ConversationList />
                    </div>

                    {/* B. RIGHT PANEL */}
                    <div className="col-span-12 md:col-span-8 lg:col-span-9 h-full">
                        <ChatWindow />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}