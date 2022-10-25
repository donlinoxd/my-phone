import { MdOutlineDevicesOther, MdOutlineMobileFriendly, MdOutlineSendToMobile, MdOutlineShoppingBag } from 'react-icons/md'

// local modules
import BuyDetails from '@/components/BuyDetails'
import MyCart from '@/components/MyCart'
import SelectBrand from '@/components/SelectBrand'
import SelectModel from '@/components/SelectModel'
import Stepper from '@/components/Stepper'
import { nextStep, setStep, setTab } from '@/rtk/features/buySlice'
import { useAppSelector } from '@/rtk/hook'

const BrandDefault = () => {
    const { step, completedStep, tab, payload } = useAppSelector((state) => state.buy)

    const steps = [
        {
            label: 'Select Brand',
            errorMsg: 'Select Device',
            icon: <MdOutlineMobileFriendly />,
            content: <SelectBrand title='Buy Your Device' nextStep={nextStep} />,
        },
        {
            label: 'Select Model',
            errorMsg: 'Select Model',
            icon: <MdOutlineSendToMobile />,
            content: <SelectModel brand={payload.brand!} nextStep={nextStep} />,
        },
        { label: 'Device Details', errorMsg: 'Input details', icon: <MdOutlineDevicesOther />, content: <BuyDetails /> },
        {
            label: 'Checkout',
            errorMsg: 'checkout',
            icon: <MdOutlineShoppingBag />,
            content: (
                <MyCart
                    values={{ brand: payload.brand!, model: payload.model?.model!, ...payload.device_details!, imageUrl: payload.model?.imageUrl! }}
                    tab={tab}
                    setTab={setTab}
                />
            ),
        },
    ]

    return <Stepper steps={steps} activeStep={step} setStep={setStep} completedStep={completedStep} />
}

export default BrandDefault
