import {
	ChangeEvent,
	ChangeEventHandler,
	ComponentType,
	DetailedHTMLProps,
	InputHTMLAttributes,
	ReactEventHandler,
	useEffect,
	useState,
} from "react";
import {
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	OutlinedInput,
	StandardTextFieldProps,
	OutlinedTextFieldProps,
	FormLabelProps,
	Button,
	ExtendButtonBase,
	ButtonTypeMap,
} from "@mui/material";
import { InputPropsType } from "src/types";
import { useStyles } from "./File.styles";

export type FileInputProps = InputPropsType & {
	error?: any;
	variant?: "big" | "normal";
	formLabelProps?: FormLabelProps;
	buttonProps: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
	inputProps: DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>;
};

interface VariantComponentType {
	[name: string]: ComponentType;
}

const variantComponent: VariantComponentType = {
	standard: Input,
	outlined: OutlinedInput,
};

export function TextInput({
	name,
	label,
	variant = "normal",
	touched,
	error,
	formLabelProps,
	buttonProps,
	inputProps,
}: FileInputProps) {
	const classes = useStyles();

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e?.target?.files || !e?.target?.files[0]) return;
		setSelectedFile(e.target.files[0]);
	};

	return (
		<FormControl fullWidth error={touched && error}>
			{label && (
				<FormLabel
					htmlFor={name}
					className={classes.label}
					{...formLabelProps}
				>
					{label}
				</FormLabel>
			)}

			<Button variant="contained" component="label" {...buttonProps}>
				{!selectedFile ? "Upload file" : selectedFile.name}
				<input
					type="file"
					hidden
					onChange={handleChange}
					{...inputProps}
				/>
			</Button>

			{touched && error && <FormHelperText> {error} </FormHelperText>}
		</FormControl>
	);
}
