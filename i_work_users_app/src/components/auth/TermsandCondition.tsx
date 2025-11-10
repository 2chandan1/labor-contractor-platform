
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // shadcn/ui
import { ScrollArea } from "@/components/ui/scroll-area";
interface TermsAndConditionsModalProps {
  open: boolean;
  onClose: () => void;
}
const TermsandCondition: React.FC<TermsAndConditionsModalProps> = ({ open, onClose }) => {
   return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent className=" max-w-sm bg-slate-900 border border-slate-700 text-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Terms & Conditions</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please read these carefully before continuing.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-80 mt-2 pr-2">
          {/* 🧾 Replace this section with your actual terms component */}
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              1. By using this platform, you agree to comply with all applicable
              laws and regulations.
            </p>
            <p>
              2. You must provide accurate and truthful information when creating
              your profile.
            </p>
            <p>
              3. Misuse of this platform may result in suspension or termination.
            </p>
            <p>4. Data shared here will be handled as per our Privacy Policy.</p>
          </div>
        </ScrollArea>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};




export default TermsandCondition