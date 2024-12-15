import {cn,} from "@bem-react/classname";
import {FC, memo, PropsWithChildren,} from "react";
import {IClassNameProps,} from "@bem-react/core";

type CustomTabPanelProps = PropsWithChildren & IClassNameProps & {
		activateValue: unknown;
		value: unknown;
}

const cnCustomTabPanel = cn('CustomTabPanel');

const CustomTabPanelFC: FC<CustomTabPanelProps> = ({activateValue, value, children, className,}) => (
		<>
				{activateValue === value && (
						<div className={cnCustomTabPanel(null, [className,])}>
								{children}
						</div>
				)}
		</>
);

const CustomTabPanel = memo(CustomTabPanelFC);

export default CustomTabPanel;