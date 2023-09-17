package net.atos.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name="clientes")
public class Cliente implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message = "¡El campo nombre no puede estar vacío!.")
	@Size(min = 4, max = 12, message="¡El tamaño tiene que estar entre 4 y 12!")
	@Column(name = "NOMBRE", nullable = false)
	@Valid
	private String nombre;
	
	@NotEmpty(message = "¡El campo apellido no puede estar vacío!.")
	@Size(min = 4, max = 12, message="¡El tamaño tiene que estar entre 4 y 12!")
	@Column(name="APELLIDO")
	private String apellido;
	
	@NotEmpty(message = "¡El campo email no puede estar vacío!.")
	@Email(message = "¡No es una dirección de coreo válida!.")
	@Column(name = "EMAIL", nullable = false, unique=true)
	private String email;
	
	@Column(name="FECHA")
	@Temporal(TemporalType.DATE)
	private Date createAt;
	
		@PrePersist
		public void prePersist() {
			createAt = new Date();
		}
		
		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getNombre() {
			return nombre;
		}

		public void setNombre(String nombre) {
			this.nombre = nombre;
		}

		public String getApellido() {
			return apellido;
		}

		public void setApellido(String apellido) {
			this.apellido = apellido;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public Date getCreateAt() {
			return createAt;
		}

		public void setCreateAt(Date createAt) {
			this.createAt = createAt;
		}
	
		public Cliente() {
			super();	
		}
		
		private static final long serialVersionUID = 1L;
}
