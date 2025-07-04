
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Brain, Send, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  collapsed?: boolean;
}

export function AIAssistant({ collapsed = false }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "assistant" as const,
      content: "Bonjour ! Je suis votre assistant comptable IA. Comment puis-je vous aider aujourd'hui ?"
    }
  ]);

  const handleSendQuestion = () => {
    if (!question.trim()) return;

    const newMessages = [
      ...messages,
      { type: "user" as const, content: question },
      { 
        type: "assistant" as const, 
        content: "Merci pour votre question. En tant qu'assistant IA, je peux vous aider avec les réglementations comptables, l'interprétation des données financières, et les bonnes pratiques comptables. Cette fonctionnalité sera bientôt disponible dans sa version complète."
      }
    ];
    
    setMessages(newMessages);
    setQuestion("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendQuestion();
    }
  };

  if (collapsed) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="w-full">
            <Brain className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span>Assistant IA</span>
            </DialogTitle>
          </DialogHeader>
          <AssistantContent 
            messages={messages}
            question={question}
            setQuestion={setQuestion}
            onSend={handleSendQuestion}
            onKeyPress={handleKeyPress}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-blue-600" />
            <span>Assistant IA</span>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Minimize2 className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <span>Assistant Comptable IA</span>
                </DialogTitle>
              </DialogHeader>
              <AssistantContent 
                messages={messages}
                question={question}
                setQuestion={setQuestion}
                onSend={handleSendQuestion}
                onKeyPress={handleKeyPress}
                expanded
              />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Posez vos questions comptables...
          </p>
          <div className="flex space-x-2">
            <Input
              placeholder="Votre question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-xs"
            />
            <Button size="icon" onClick={handleSendQuestion} className="h-8 w-8">
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AssistantContent({ 
  messages, 
  question, 
  setQuestion, 
  onSend, 
  onKeyPress,
  expanded = false 
}: {
  messages: Array<{ type: "user" | "assistant"; content: string }>;
  question: string;
  setQuestion: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  expanded?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className={cn(
        "space-y-3 overflow-y-auto",
        expanded ? "max-h-96" : "max-h-40"
      )}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "p-3 rounded-lg text-sm",
              message.type === "user"
                ? "bg-blue-100 dark:bg-blue-900 ml-4"
                : "bg-gray-100 dark:bg-gray-800 mr-4"
            )}
          >
            <div className="font-medium text-xs mb-1 text-gray-600 dark:text-gray-400">
              {message.type === "user" ? "Vous" : "Assistant IA"}
            </div>
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          placeholder="Posez votre question comptable..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={onKeyPress}
        />
        <Button onClick={onSend}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
