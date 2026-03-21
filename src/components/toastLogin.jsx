import * as React from "react";
import { Toast } from "radix-ui";
import "./toast.css";

export const ToastDemo = ({trigger}) => {
	const [open, setOpen] = React.useState(false);
	const timerRef = React.useRef(0);

	React.useEffect(() => {
        if (trigger){
            setOpen(false);
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(()=>{
                setOpen(true);
            },100)
        }
		return () => clearTimeout(timerRef.current);
	}, [trigger]);

	return (
		<Toast.Provider swipeDirection="right">
			<Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
				<Toast.Title className="ToastTitle">Login Successful!</Toast.Title>
				<Toast.Description className="ToastDescription">
					Publish articles in editor dashboard. 
				</Toast.Description>
				<Toast.Action
					className="ToastAction"
					asChild
					altText="Goto schedule to undo"
				>
					<button className="Button small green">Dismiss</button>
				</Toast.Action>
			</Toast.Root>
			<Toast.Viewport className="ToastViewport" />
		</Toast.Provider>
	);
};



export default ToastDemo;
