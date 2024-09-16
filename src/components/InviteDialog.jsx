import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Facebook, Twitter, LinkedIn, Instagram, Mail } from "lucide-react";

const socialIcons = [
  { icon: Facebook, name: 'Facebook' },
  { icon: Twitter, name: 'Twitter' },
  { icon: LinkedIn, name: 'LinkedIn' },
  { icon: Instagram, name: 'Instagram' },
  { icon: Mail, name: 'Email' },
];

const InviteDialog = ({ isOpen, onClose }) => {
  const handleIconClick = (socialName) => {
    console.log(`Inviting via ${socialName}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black text-white">
        <DialogHeader>
          <DialogTitle>Invite Connections</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {socialIcons.map(({ icon: Icon, name }) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center p-4 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800"
              onClick={() => handleIconClick(name)}
            >
              <Icon className="h-8 w-8 mb-2" />
              <span className="text-sm">{name}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;