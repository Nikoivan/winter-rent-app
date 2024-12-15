import {FC} from "react";
import {cn} from "@bem-react/classname";

import './PageHeader.scss';

type PageHeaderProps = {
		title: string;
}

const cnPageHeader = cn('PageHeader');

const PageHeader: FC<PageHeaderProps> = ({title}) => (
		<div className={cnPageHeader()}>
				<h1 className={cnPageHeader('Title')}>{title}</h1>
		</div>
);

export default PageHeader;