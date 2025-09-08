import { Pencil } from "lucide-react";
import IconBadge from "./common/IconBadge";
import { useState } from "react";
import bankLogo from "../../assets/images/image.png";
import EditBankDetailsModal from "./modals/EditBankDetailsModal";
import TipReceiverService from "../../services/tipReceiverService";
import { useUser } from "../../context/UserContext";

const BankDetailsCard = ({
  bankData,
  bankCountryName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {currentUser}=useUser()
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


   async function onEdit(data)
   {
        const res=await TipReceiverService.updatePaymentInfoByTipReceiverId(currentUser.id,data)
        console.log(res)
   }

  return (
    <>
      <div
        className="bg-white rounded-md shadow-sm border border-gray-100 p-6 
                   flex flex-col items-stretch w-full max-w-[400px] h-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-gray-900">Bank Details</h3>

          <IconBadge
            as="button"
            icon={Pencil}
            size={34}
            className="border border-primary bg-transparent"
            iconClass="text-primary"
            iconSize={16}
            onClick={handleOpenModal}
          />
        </div>

        {/* Fields */}
        <div className="space-y-4 flex-1">
          {/* Bank */}
          <div
            className="bg-gray-50 rounded-md px-4 py-3 flex items-center justify-between 
                       w-full max-w-[368px] h-[82px]"
          >
            <div>
              <p className="text-xs text-gray-500">Bank</p>
              <p className="text-sm font-medium text-gray-900">{bankData.bankName}</p>
            </div>
            <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full">
              <img
                src={bankLogo}
                alt="Bank Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Account Holder Name */}
          <div
            className="bg-gray-50 rounded-md px-4 py-3 flex flex-col justify-center 
                       w-full max-w-[368px] h-[82px]"
          >
            <p className="text-xs text-gray-500">Account Holder Name</p>
            <p className="text-sm font-medium text-gray-900">{bankData.accountHolderName}</p>
          </div>

          {/* Country */}
          <div
            className="bg-gray-50 rounded-md px-4 py-3 flex flex-col justify-center 
                       w-full max-w-[368px] h-[82px]"
          >
            <p className="text-xs text-gray-500">Country</p>
            <p className="text-sm font-medium text-gray-900">{bankCountryName}</p>
          </div>

          {/* IBAN */}
          <div
            className="bg-gray-50 rounded-md px-4 py-3 flex flex-col justify-center 
                       w-full max-w-[368px] h-[82px]"
          >
            <p className="text-xs text-gray-500">IBAN</p>
            <p className="text-sm font-mono font-medium text-gray-900 break-all">
              {bankData.IBAN}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Bank Details Modal */}
      <EditBankDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        bankData={bankData}
        onSave={onEdit}
      />
    </>
  );
};

export default BankDetailsCard;