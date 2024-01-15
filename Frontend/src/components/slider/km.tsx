import {Slider, SliderSingleProps} from "antd";

interface KmSliderProps {
    value?: number;
    onChange?: (_: number) => void;
}

const marks: SliderSingleProps['marks'] = {
    0.8: '800 متر',
    3: '۳ کیلومتر'
};

const KmSlider = (props: KmSliderProps) => {
    return <Slider
        marks={marks}
        max={3}
        min={.8}
        onChange={props.onChange}
        value={props.value}
        step={0.1}
        tooltip={{
            placement: "bottom",
            formatter: (value) => {
                if (!value) return "";
                if (value < 1) {
                    return (value * 1000) + " متر"
                }
                return value + " کیلومتر"
            }
        }}
    />
}

export default KmSlider;