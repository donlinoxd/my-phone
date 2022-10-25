import type { NextPage } from 'next'
import { MdOutlineDevicesOther, MdOutlineLocalShipping, MdOutlineMobileFriendly, MdOutlineSendToMobile } from 'react-icons/md'

// local modules
import MyCart from '@/components/MyCart'
import SelectBrand from '@/components/SelectBrand'
import SelectModel from '@/components/SelectModel'
import SellDetails from '@/components/SellDetails'
import Stepper from '@/components/Stepper'
import { nextStep, setStep, setTab } from '@/rtk/features/sellSlice'
import { useAppSelector } from '@/rtk/hook'

const Sell: NextPage = () => {
    const { step, tab, completedStep, payload } = useAppSelector((state) => state.sell)
    const { brands } = useAppSelector((state) => state.common)

    const steps = [
        {
            label: 'Select Brand',
            errorMsg: 'Select device',
            icon: <MdOutlineMobileFriendly />,
            content: <SelectBrand title='Sell Your Device' nextStep={nextStep} />,
        },
        {
            label: 'Select Model',
            errorMsg: 'Select model',
            icon: <MdOutlineSendToMobile />,
            content: <SelectModel brand={payload.brand!} nextStep={nextStep} />,
        },
        { label: 'Device Details', errorMsg: 'Input details', icon: <MdOutlineDevicesOther />, content: <SellDetails /> },
        {
            label: 'Checkout',
            errorMsg: 'checkout',
            icon: <MdOutlineLocalShipping />,
            content: (
                <MyCart
                    values={{
                        brand: payload.brand!,
                        model: '',
                        carrier: payload.device_details?.carrier!,
                        condition: payload.device_details?.condition!,
                        storage: payload.device_details?.storage!,
                        imageUrl: brands.find((brand) => brand.brand === payload.brand!)?.imageUrl!,
                    }}
                    tab={tab}
                    setTab={setTab}
                />
            ),
        },
    ]

    return <Stepper steps={steps} activeStep={step} setStep={setStep} completedStep={completedStep} />
}

export default Sell
