import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { useUser } from "../context/userContext";
import { useForm } from "react-hook-form";
import '../Css/LoginPage.css'
function RegisterModal (props) {
   
    const{registerFunction} = useUser()
    const{register,handleSubmit,formState:{errors}} = useForm()
    const{confirmError,setConfirmError} = useState(false)
    
    const onRegister = handleSubmit(async (values) => {
      try {
        
        if(values.Confirmpassword != values.password)return console.log("contraseñas distintas")
       registerFunction(values);
      
      } catch (error) {
        console.log(error);
      }
     
    })
    return(
          <Modal show={props.show} onHide={props.handleClose} >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
        <Form className="mb-3">
        <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control type="text" placeholder="Nombre de Usuario"  {...register("username", { required: true,minLength:4,maxLength:50}) } aria-invalid={errors.username ? "true" : "false"}/>
              </Form.Group>
    
              {errors.username?.type == "required" && (<p className="text-red">El nombre de Usuario es requerido</p>)}
              {errors.username?.type == "minLength" && (<p className="text-red">El nombre de Usuario debe tener almenos 4 caracteres </p>)}
              {errors.username?.type == "maxLength" && (<p className="text-red">El nombre de Usuario es demasiado largo</p>)}
        <Form.Group className="mb-3" controlId="formFullname">
                <Form.Label>Nombre y Apellido</Form.Label>
                <Form.Control type="text" placeholder="Nombre y Apellido"  {...register("name", { required: true ,minLength:6,maxLength:60}) }aria-invalid={errors.name ? "true" : "false"}/>
              </Form.Group>
              {errors.name?.type == "required" && (<p className="text-red">El nombre es requerido</p>)}
              {errors.name?.type == "minLength" && (<p className="text-red">El nombre  debe tener almenos 4 caracteres </p>)}
              {errors.name?.type == "maxLength" && (<p className="text-red">El nombre  es demasiado largo</p>)}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Example@email.com" {...register("email", { required: true ,minLength:6,maxLength:50 })} aria-invalid={errors.email ? "true" : "false"}/>
              </Form.Group>
              {errors.email?.type == "required" && (<p className="text-red">El email es requerido</p>)}
              {errors.email?.type == "minLength" && (<p className="text-red">El   email es invalido</p>)}
              {errors.email?.type == "maxLength" && (<p className="text-red">El email  es demasiado largo</p>)}

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" {...register("password", { required: true ,minLength:8,maxLength:50})} aria-invalid={errors.password ? "true" : "false"} />
              </Form.Group>
              {errors.password?.type == "required" && (<p className="text-red">La contrseña es requerida</p>)}
              {errors.password?.type == "minLength" && (<p className="text-red">La contrseña debe tener almenos 8 caracteres </p>)}
              {errors.password?.type == "maxLength" && (<p className="text-red">La contrseña es demasiado larga</p>)}
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control type="password" placeholder="Confirmar contraseña" {...register("Confirmpassword", { required: true,minLength:4,maxLength:50 })}aria-invalid={errors.Confirmpassword ? "true" : "false"} />
              </Form.Group>
            
              {errors.Confirmpassword?.type == "required" && (<p className="text-red">La confirmacion de contrseña es requerida</p>)}
              {errors.Confirmpassword?.type == "minLength" && (<p className="text-red">La contrseña debe tener almenos 8 caracteres </p>)}
              {errors.Confirmpassword?.type == "maxLength" && (<p className="text-red">La contrseña es demasiado larga</p>)}
        </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white">
          <Button variant="secondary" onClick={props.handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={onRegister}>
            Registrarse
          </Button>
        </Modal.Footer>
      </Modal> 
    )
}
export default RegisterModal;
export{}