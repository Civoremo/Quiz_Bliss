import React from 'react';
import axios from 'axios';

import '../styles/ProfilePage.css';

const baseUrl = process.env.REACT_APP_QUIZ_API;

class ProfilePage extends React.Component {
	constructor() {
		super();
		this.state = {
			user: '',
			image: '',
			oldPass: '',
			newPass1: '',
			newPass2: '',
			showImageForm: false,
			showPasswordForm: false
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	toggleImageForm = (e) => {
		e.preventDefault();
		this.setState({
			showImageForm: !this.state.showImageForm
		});
		if (!this.state.showImageForm) {
			this.setState({
				image: ''
			});
		}
	};

	togglePasswordForm = (e) => {
		e.preventDefault();
		this.setState({
			showPasswordForm: !this.state.showPasswordForm
		});
		if (!this.state.showPasswordForm) {
			this.setState({
				oldPass: '',
				newPass1: '',
				newPass2: ''
			});
		}
	};

	changeProfileImage = (e) => {
		e.preventDefault();
		if (this.state.image !== '') {
			console.log('requesting to update profile image');
			axios({
				method: 'patch',
				url: `${baseUrl}api/auth/update`,
				data: {
					img_url: this.state.image,
					password: 'PassWord1'
				}

				// headers : {
				//     Authorization: localStorage.getItem('userToken'),
				// }
			})
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	changePassword = (e) => {
		e.preventDefault();
		if (this.state.newPass1 === this.state.newPass2) {
			axios({
				method: 'patch',
				url: `${baseUrl}api/auth/update`,
				data: {
					currentPassword: this.state.oldPass,
					newPassword: this.state.newPass1
				},

				headers: {
					Authorization: localStorage.getItem('userToken')
				}
			})
				.then((res) => {
					localStorage.setItem('userToken', res.data.token);
					this.setState({
						showImageForm: false,
						showPasswordForm: false,
						oldPass: '',
						newPass1: '',
						newPass2: ''
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	render() {
		return (
			<div className='profilePage-container'>
				<h3 className='profilePage-titleText'>Profile Page</h3>
				<div className='profilePage-img-content'>
					<div className='profilPage-formlink' onClick={this.toggleImageForm}>
						{this.state.showImageForm ? 'cancel image change' : 'change image'}
					</div>
					<img src={localStorage.getItem('userImg')} alt='profile' className='profilePage-img' />
					<div className={this.state.showImageForm ? 'imageForm-show' : 'imageForm-hide'}>
						<form>
							<input
								onChange={this.handleChange}
								type='text'
								placeholder='new profile image url'
								name='image'
								value={this.state.image}
							/>
							<button onClick={this.changeProfileImage}>save image</button>
						</form>
					</div>
				</div>
				<div className='profilePage-username'>{localStorage.getItem('username')}</div>
				<div>
					<div className='profilPage-formlink' onClick={this.togglePasswordForm}>
						{this.state.showPasswordForm ? 'cancel password change' : 'change password'}
					</div>
					<input type='password' disabled={true} placeholder='password' className='profilePage-inputField' />
					<div className={this.state.showPasswordForm ? 'passForm-show' : 'passForm-hide'}>
						<form className='profilePage-changePass-container'>
							<input
								onChange={this.handleChange}
								type='password'
								placeholder='current password'
								name='oldPass'
								value={this.state.oldPass}
								className='profilePage-inputField-newPassword'
							/>
							<input
								onChange={this.handleChange}
								type='password'
								placeholder='new password'
								name='newPass1'
								value={this.state.newPass1}
								className='profilePage-inputField-newPassword'
							/>
							<input
								onChange={this.handleChange}
								type='password'
								placeholder='confirm password'
								name='newPass2'
								value={this.state.newPass2}
								className='profilePage-inputField-newPassword'
							/>
							<button onClick={this.changePassword}>save password</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfilePage;
