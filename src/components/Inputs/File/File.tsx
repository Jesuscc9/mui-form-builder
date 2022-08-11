import {
	ChangeEvent,
	DetailedHTMLProps,
	InputHTMLAttributes,
	useState,
} from "react";
import {
	FormControl,
	FormLabel,
	FormHelperText,
	FormLabelProps,
	Button,
	ExtendButtonBase,
	ButtonTypeMap,
	CircularProgress,
} from "@mui/material";
import { ButtonProps } from "@mui/material";
import { InputPropsType } from "src/types";
import { useStyles } from "./File.styles";

export type FileInputProps = InputPropsType & {
	error?: any;
	onChange: any;
	variant?: "big" | "normal";
	loading?: boolean;
	formLabelProps?: FormLabelProps;
	buttonProps: ButtonProps;
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
	onChange,
}: FileInputProps) {
	const classes = useStyles();

	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e)
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
					<div style={{ color: "#fff" }}>
						<CircularProgress color="inherit" size={18} />
					</div>
				) : (
					<>
						{!selectedFiles ? (
							"Upload file"
						) : (
							<div
								style={{
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								<b style={{ fontWeight: "normal" }}>
									{fileNames}
								</b>
							</div>
						)}
					</>
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
