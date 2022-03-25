import * as React from "react";
import { useApp } from "hook";
import { myAdd, return_vault_name} from "TestScript"


export const ReactView = () => {
	const { vault } = useApp();
	
	return <h4>{return_vault_name()}</h4>;
};
