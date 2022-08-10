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
	CircularProgress,
} from "@mui/material";
import { InputPropsType } from "src/types";
import { useStyles } from "./File.styles";

export type FileInputProps = InputPropsType & {
	error?: any;
	onChange: any;
	variant?: "big" | "normal";
	loading?: boolean;
	formLabelProps?: FormLabelProps;
	buttonProps: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
	inputProps: DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>;
};

export function FileInput({
	name,
	label,
	variant = "normal",
	touched,
	error,
	formLabelProps,
	buttonProps,
	inputProps,
	loading = false,
}: FileInputProps) {
	const classes = useStyles();

	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e?.target?.files) return;
		setSelectedFiles(e.target.files);
	};

	const fileNames =
		selectedFiles &&
		Array.from(selectedFiles)
			.map((e) => e.name)
			.join(",");

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
				{loading ? (
					<div style={{ color: '#fff' }}>
						<CircularProgress color="inherit" size={18} />
					</div>
				) : (
					<>{!selectedFiles ? "Upload file" : fileNames}</>
				)}
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
