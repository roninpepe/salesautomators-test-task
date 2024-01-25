import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import API from 'api/api';
import { technician as defaultTechnician } from 'mock/api';
import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import { EAPIFields, EArea, EJobSource, EJobType } from 'enums/_';
import {
	IAPIRequestBodyDeals,
	IAPIResponseDeals,
	IFields,
	IUser
} from 'types/_';
import styles from 'styles/components/Form.module.scss';

function Form() {
	const {
		register,
		formState: { isSubmitting, isSubmitted },
		control,
		reset,
		handleSubmit
	} = useForm<IFields>();

	const [technicians, setTechnicians] = useState<IUser[]>([defaultTechnician]);
	const [lastTicket, setLastTicket] = useState<IAPIResponseDeals>();

	const results = useRef<null | HTMLDivElement>(null);

	const areas = Object.entries(EArea);
	const jobTypes = Object.entries(EJobType);
	const jobSources = Object.entries(EJobSource);

	const onSubmit = async ({
		first_name,
		last_name,
		phone,
		email,
		type,
		source,
		description,
		address,
		area,
		date,
		time_start,
		time_end,
		technician
	}: IFields) => {
		const requestBody: IAPIRequestBodyDeals = {
			title: `[${technician}] ${type} (${first_name} ${last_name}, ${date}: ${time_start} … ${time_end})`,
			[EAPIFields.first_name]: first_name,
			[EAPIFields.last_name]: last_name,
			[EAPIFields.phone]: phone,
			[EAPIFields.email]: email,
			[EAPIFields.type]: type,
			[EAPIFields.source]: source,
			[EAPIFields.description]: description,
			[EAPIFields.address]: address.label,
			[EAPIFields.area]: area,
			[EAPIFields.date]: date,
			[EAPIFields.time_start]: time_start,
			[EAPIFields.time_end]: time_end,
			[EAPIFields.technician]: technician
		};
		if (API.deals.post) {
			const res = await API.deals.post(requestBody);
			setLastTicket({
				...res,
				[EAPIFields.area]: area,
				[EAPIFields.type]: type
			});
			if (results.current) results.current.scrollIntoView();
			reset();
		}
	};

	useEffect(() => {
		const fetchUsers = async () => {
			if (API.users.get) {
				const users = await API.users.get();
				setTechnicians(users);
			}
		};
		fetchUsers();
	}, []);

	return (
		<div className={styles._}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.group}>
					<h2 className={styles.header}>Client details</h2>
					<div className={styles.row}>
						<input
							type="text"
							{...register('first_name')}
							placeholder="First name"
							required
						/>
						<input
							type="text"
							{...register('last_name')}
							placeholder="Last name"
							required
						/>
					</div>
					<input
						type="tel"
						{...register('phone')}
						pattern="\+\d+"
						placeholder="Phone (+xxxxxxx)"
						required
					/>
					<input
						type="email"
						{...register('email')}
						placeholder="Email (optional)"
					/>
				</div>
				<div className={styles.group}>
					<h2 className={styles.header}>Job details</h2>
					<div className={styles.row}>
						<select {...register('type')} defaultValue="" required>
							<option value="" disabled hidden>
								Job type
							</option>
							{jobTypes.map(([key, item]) => (
								<option key={key} value={item}>
									{item}
								</option>
							))}
						</select>
						<select {...register('source')} defaultValue="" required>
							<option value="" disabled hidden>
								Job source
							</option>
							{jobSources.map(([key, item]) => (
								<option key={key} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>
					<textarea
						rows={5}
						{...register('description')}
						placeholder="Job description (optional)"
					/>
				</div>
				<div className={styles.group}>
					<h2 className={styles.header}>Service location</h2>
					<Controller
						name="address"
						rules={{
							required: 'This is a required field'
						}}
						control={control}
						render={({ field }) => (
							<GooglePlacesAutocomplete
								apiKey="AIzaSyAsc69G6yC0OKUVzNm5o90_EvDHHNL7wxE"
								// @ts-expect-error due to crappy legacy component typing
								selectProps={{
									...field,
									required: true,
									placeholder: 'Location'
								}}
							/>
						)}
					/>
					<select {...register('area')} defaultValue="" required>
						<option value="" disabled hidden>
							Area
						</option>
						{areas.map(([key, item]) => (
							<option key={key} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className={styles.group}>
					<h2 className={styles.header}>Scheduled</h2>
					<input
						type="text"
						min={new Date().toJSON().slice(0, 10)}
						{...register('date')}
						onFocus={({ currentTarget }) => {
							currentTarget.type = 'date';
						}}
						onBlur={({ currentTarget }) => {
							if (!currentTarget.value) currentTarget.type = 'text';
						}}
						placeholder="Start date"
						required
					/>
					<div className={styles.row}>
						<input
							type="text"
							step={300}
							{...register('time_start')}
							onFocus={({ currentTarget }) => {
								currentTarget.type = 'time';
							}}
							onBlur={({ currentTarget }) => {
								if (!currentTarget.value) currentTarget.type = 'text';
							}}
							placeholder="Start time"
							required
						/>
						<input
							type="text"
							step={300}
							{...register('time_end')}
							onFocus={({ currentTarget }) => {
								currentTarget.type = 'time';
							}}
							onBlur={({ currentTarget }) => {
								if (!currentTarget.value) currentTarget.type = 'text';
							}}
							placeholder="End time"
							required
						/>
					</div>
					<select {...register('technician')} defaultValue="" required>
						<option value="" disabled hidden>
							Technician
						</option>
						{technicians.map((item) => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<button type="submit">
					{isSubmitting ? <Loader /> : 'Submit a ticket'}
				</button>
			</form>
			{isSubmitted && lastTicket ? (
				<div className={styles.results} ref={results}>
					<h2>{`Your ticket #${lastTicket.id}`}</h2>
					<p>{`${lastTicket[EAPIFields.type]}, ${lastTicket[EAPIFields.date]} ${lastTicket[EAPIFields.time_start]} — ${lastTicket[EAPIFields.time_end]}`}</p>
					<p>{`Technician: ${lastTicket[EAPIFields.technician].name} from ${lastTicket[EAPIFields.area]}`}</p>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default Form;
